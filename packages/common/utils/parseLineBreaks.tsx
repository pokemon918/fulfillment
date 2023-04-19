import { ReactNode } from 'react';

type PieceParser = (str: string) => string | string[] | ReactNode | ReactNode[];

const parseLineBreaks = (str: string, parser?: PieceParser): ReactNode[] => {
  const pieces = str.split(/\r?\n|\r/);

  const processed: ReactNode[] = [];
  pieces.forEach((piece, pieceIdx) => {
    if (processed.length !== 0) processed.push(<br key={pieceIdx} />);
    processed.push(parser ? parser(piece) : piece);
  });

  return processed;
};

export default parseLineBreaks;
