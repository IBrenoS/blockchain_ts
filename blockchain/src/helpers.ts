import crypto from 'crypto';

export function hash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function hashValidado({ hash, dificuldade, prefixo }: { hash: string; dificuldade: number; prefixo: string }): boolean {
  const prefixoCorreto = prefixo.repeat(dificuldade);
  return hash.startsWith(prefixoCorreto);
}
