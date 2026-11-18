export type StorySectionId =
  | 'origem'
  | 'brownie'
  | 'ingredientes'
  | 'contato'
  | 'historia'
  | 'especial'
  | 'sabor';

export interface StorySection {
  id: StorySectionId;
  kicker: string;
  title: string;
  lead: string;
  paragraphs: string[];
  statement: string;
}

export const INSTAGRAM_HANDLE = '@7anoo_a.2';
export const INSTAGRAM_URL = 'https://www.instagram.com/7anoo_a.2/';

export const STORY_SECTIONS: Record<StorySectionId, StorySection> = {
  historia: {
    id: 'historia',
    kicker: 'Santa Maria, Rio Grande do Norte',
    title: 'Antes de chegar à receita, existe uma história.',
    lead: 'Uma terra, um cajueiro e um ingrediente que carrega identidade.',
    paragraphs: [
      'Da inspiração de Santa Maria nasce um brownie que une o sabor intenso do chocolate à personalidade da castanha.',
      'O cajueiro faz parte da paisagem e da memória do Rio Grande do Norte. Trazer essa referência para o brownie é reconhecer de onde a ideia vem, sem excessos e sem artifícios.',
    ],
    statement: 'O sabor de uma boa história começa na origem.',
  },
  origem: {
    id: 'origem',
    kicker: 'Nossa origem',
    title: 'Um pedaço da nossa terra, em forma de brownie.',
    lead: 'Santa Maria, no Rio Grande do Norte, dá o ponto de partida para tudo o que colocamos no forno.',
    paragraphs: [
      'A relação com o lugar aparece na escolha dos elementos e na forma direta de contar o que fazemos. O cajueiro não é apenas cenário: é o símbolo que orienta o caráter do produto.',
      'Cada receita busca traduzir essa presença regional com equilíbrio entre o peso do cacau e a firmeza da castanha.',
    ],
    statement: 'Tem história em cada pedaço.',
  },
  brownie: {
    id: 'brownie',
    kicker: 'O brownie',
    title: 'Textura firme por fora, interior macio e pedaços reais de castanha.',
    lead: 'Feito para que chocolate e castanha dividam o protagonismo em cada mordida.',
    paragraphs: [
      'Não tentamos complicar um doce que funciona justamente pela honestidade dos seus contrastes: a densidade do chocolate escuro encontra a crocância natural da castanha.',
      'Um brownie direto, pensado para permanecer na memória pelo sabor e pela textura, sem distrações.',
    ],
    statement: 'De Santa Maria, com gosto de quero mais.',
  },
  ingredientes: {
    id: 'ingredientes',
    kicker: 'Ingredientes',
    title: 'Chocolate de verdade. Castanha com identidade.',
    lead: 'Dois elementos principais que sustentam o caráter da receita do começo ao fim.',
    paragraphs: [
      'O chocolate traz profundidade e amargor equilibrado; a castanha acrescenta textura, aroma tostado e o vínculo direto com a paisagem nordestina.',
      'Sem promessas exageradas ou discursos prontos — apenas matéria-prima tratada com respeito ao tempo e ao ponto certo de cocção.',
    ],
    statement: 'Chocolate de verdade. Castanha com identidade.',
  },
  especial: {
    id: 'especial',
    kicker: 'O que torna especial',
    title: 'Não é apenas mais um brownie.',
    lead: 'A diferença está no vínculo entre receita, território e intenção.',
    paragraphs: [
      'Enquanto muitos doces seguem fórmulas genéricas, o Brownie de Castanha parte de uma referência concreta: a presença do cajueiro e a memória afetiva de Santa Maria.',
      'Isso orienta desde a proporção dos pedaços de castanha até o jeito direto como apresentamos o produto.',
    ],
    statement: 'Tem história em cada pedaço.',
  },
  sabor: {
    id: 'sabor',
    kicker: 'Descubra o sabor',
    title: 'Intenso no chocolate, marcado pela castanha.',
    lead: 'Um contraste pensado para ser sentido do primeiro corte à última migalha.',
    paragraphs: [
      'A superfície levemente quebradiça abre caminho para uma massa densa e úmida, interrompida pelo encontro firme da castanha.',
      'É o encontro de dois sabores conhecidos, colocados lado a lado para mostrar o quanto ainda podem surpreender.',
    ],
    statement: 'De Santa Maria, com gosto de quero mais.',
  },
  contato: {
    id: 'contato',
    kicker: 'Contato',
    title: 'Fale com a gente.',
    lead: 'Pedidos, parcerias ou conversas sobre o Brownie de Castanha em Santa Maria, RN.',
    paragraphs: [
      'Fale diretamente com a gente pelo nosso perfil no Instagram. Respondemos cada mensagem de forma próxima e direta.',
    ],
    statement: 'Santa Maria · Rio Grande do Norte',
  },
};
