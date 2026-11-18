import { useCallback, useEffect, useRef } from 'react';

const VIMEO_EMBED_URL =
  'https://player.vimeo.com/video/1247361100?h=8999b258d4&background=1&muted=1&loop=1&autopause=0&dnt=1&playsinline=1';
const VIMEO_ORIGIN = 'https://player.vimeo.com';
const DEFAULT_DURATION_SECONDS = 6;
const SENSITIVITY = 0.8;
const LERP_FACTOR = 0.08;
const PARALLAX_LERP = 0.08;
const MIN_TIME_DELTA = 0.008;
const SEEK_FALLBACK_TIMEOUT_MS = 120;
const TOUCH_DRAG_THRESHOLD_PX = 6;

interface VimeoMessage {
  event?: string;
  method?: string;
  value?: unknown;
  data?: { seconds?: number };
}

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

function isMobileTouchDevice(): boolean {
  return (
    window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
    window.innerWidth < 768
  );
}

export function ScrubVideoBackground() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const isTouchDraggingRef = useRef<boolean>(false);
  const durationRef = useRef<number>(DEFAULT_DURATION_SECONDS);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const lastSentTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const lastSeekDispatchRef = useRef<number>(0);
  const hasPausedInitialRef = useRef<boolean>(false);

  const targetOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const postToVimeo = useCallback((method: string, value?: unknown) => {
    const target = iframeRef.current?.contentWindow;
    if (!target) return;

    const payload = value === undefined ? { method } : { method, value };
    target.postMessage(JSON.stringify(payload), VIMEO_ORIGIN);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastFrameTime = performance.now();

    const updateTargetFromDelta = (deltaX: number) => {
      if (deltaX === 0) return;

      const duration = durationRef.current;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const timeOffset = (deltaX / window.innerWidth) * SENSITIVITY * duration;
      targetTimeRef.current = Math.max(
        0,
        Math.min(duration, targetTimeRef.current + timeOffset),
      );
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== VIMEO_ORIGIN) return;

      let data: VimeoMessage;
      try {
        data =
          typeof event.data === 'string'
            ? (JSON.parse(event.data) as VimeoMessage)
            : (event.data as VimeoMessage);
      } catch {
        return;
      }

      if (!data) return;

      if (data.event === 'ready') {
        postToVimeo('addEventListener', 'play');
        postToVimeo('addEventListener', 'seeked');
        postToVimeo('addEventListener', 'loaded');
        postToVimeo('addEventListener', 'timeupdate');
        postToVimeo('getDuration');
        postToVimeo('setVolume', 0);

        if (isMobileTouchDevice()) {
          postToVimeo('setLoop', true);
          postToVimeo('setPlaybackRate', 0.8);
          postToVimeo('play');
        } else {
          postToVimeo('pause');
        }
        return;
      }

      if (data.method === 'getDuration' && typeof data.value === 'number') {
        if (Number.isFinite(data.value) && data.value > 0) {
          durationRef.current = data.value;
        }
        return;
      }

      if (
        data.event === 'timeupdate' &&
        isMobileTouchDevice() &&
        !isTouchDraggingRef.current &&
        typeof data.data?.seconds === 'number'
      ) {
        currentTimeRef.current = data.data.seconds;
        targetTimeRef.current = data.data.seconds;
        lastSentTimeRef.current = data.data.seconds;
        return;
      }

      if (
        data.event === 'play' &&
        !hasPausedInitialRef.current &&
        !isMobileTouchDevice()
      ) {
        hasPausedInitialRef.current = true;
        postToVimeo('pause');
        postToVimeo('setCurrentTime', currentTimeRef.current);
        return;
      }

      if (data.event === 'seeked') {
        isSeekingRef.current = false;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const normX = event.clientX / window.innerWidth - 0.5;
      const normY = event.clientY / window.innerHeight - 0.5;
      targetOffsetRef.current = {
        x: normX * 26,
        y: normY * 16,
      };

      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;
      updateTargetFromDelta(delta);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const touch = event.touches[0];
      prevXRef.current = touch.clientX;
      touchStartXRef.current = touch.clientX;
      isTouchDraggingRef.current = false;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const touch = event.touches[0];
      const currentX = touch.clientX;

      if (
        !isTouchDraggingRef.current &&
        touchStartXRef.current !== null &&
        Math.abs(currentX - touchStartXRef.current) > TOUCH_DRAG_THRESHOLD_PX
      ) {
        isTouchDraggingRef.current = true;
        if (isMobileTouchDevice()) {
          postToVimeo('pause');
        }
      }

      const normX = touch.clientX / window.innerWidth - 0.5;
      const normY = touch.clientY / window.innerHeight - 0.5;
      targetOffsetRef.current = {
        x: normX * 16,
        y: normY * 10,
      };

      if (prevXRef.current === null) {
        prevXRef.current = currentX;
        return;
      }

      const delta = currentX - prevXRef.current;
      prevXRef.current = currentX;

      if (isTouchDraggingRef.current || !isMobileTouchDevice()) {
        updateTargetFromDelta(delta);
      }
    };

    const handleTouchEnd = () => {
      if (isMobileTouchDevice()) {
        if (isTouchDraggingRef.current) {
          isTouchDraggingRef.current = false;
        }
        postToVimeo('play');
        targetOffsetRef.current = { x: 0, y: 0 };
      }
      touchStartXRef.current = null;
      prevXRef.current = null;
    };

    const animate = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrameTime) / 1000));
      lastFrameTime = now;

      const mobile = isMobileTouchDevice();

      // On mobile while playing natively, skip manual setCurrentTime seeks unless dragging
      const shouldScrubSeek = !mobile || isTouchDraggingRef.current;

      if (shouldScrubSeek) {
        const frameFactor = 1 - Math.pow(1 - LERP_FACTOR, dt * 60);
        currentTimeRef.current = lerp(
          currentTimeRef.current,
          targetTimeRef.current,
          frameFactor,
        );

        if (Math.abs(targetTimeRef.current - currentTimeRef.current) < 0.001) {
          currentTimeRef.current = targetTimeRef.current;
        }

        const elapsedSinceSeek = now - lastSeekDispatchRef.current;
        const seekReady =
          !isSeekingRef.current || elapsedSinceSeek >= SEEK_FALLBACK_TIMEOUT_MS;

        if (
          seekReady &&
          Math.abs(currentTimeRef.current - lastSentTimeRef.current) >=
            MIN_TIME_DELTA
        ) {
          isSeekingRef.current = true;
          lastSeekDispatchRef.current = now;
          lastSentTimeRef.current = currentTimeRef.current;
          postToVimeo(
            'setCurrentTime',
            Number(currentTimeRef.current.toFixed(3)),
          );
        }
      }

      // Gentle ambient float on mobile when idle; desktop uses exact cursor targetOffset
      const desiredOffset =
        mobile && !isTouchDraggingRef.current
          ? {
              x: Math.sin(now / 1800) * 6,
              y: Math.cos(now / 2200) * 4,
            }
          : targetOffsetRef.current;

      const parallaxFactor = 1 - Math.pow(1 - PARALLAX_LERP, dt * 60);
      currentOffsetRef.current.x = lerp(
        currentOffsetRef.current.x,
        desiredOffset.x,
        parallaxFactor,
      );
      currentOffsetRef.current.y = lerp(
        currentOffsetRef.current.y,
        desiredOffset.y,
        parallaxFactor,
      );

      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${currentOffsetRef.current.x.toFixed(2)}px, ${currentOffsetRef.current.y.toFixed(2)}px, 0)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      window.cancelAnimationFrame(rafId);
    };
  }, [postToVimeo]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 bg-[#f4f3ee] studio-ambient-glow overflow-hidden pointer-events-none select-none"
    >
      <div ref={stageRef} className="fixed inset-0 will-change-transform">
        <div className="video-soft-feather absolute left-1/2 -translate-x-1/2 top-[27%] -translate-y-1/2 w-[114vw] aspect-video md:left-auto md:right-[-2vw] md:translate-x-0 md:top-[53%] md:-translate-y-1/2 md:w-[min(58vw,calc(82vh*16/9))] md:max-w-[940px] overflow-hidden">
          <iframe
            ref={iframeRef}
            src={VIMEO_EMBED_URL}
            title="Brownie de Castanha"
            allow="autoplay; fullscreen; picture-in-picture"
            tabIndex={-1}
            className="w-full h-full border-0 scale-[1.03] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
