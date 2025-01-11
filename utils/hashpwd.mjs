import crypto from 'crypto';

// Fonction pour hacher le mot de passe
export default function hashPasswd(password) {
  // Créer un objet de hachage SHA-1
  const hash = crypto.createHash('sha1');

  // Mets à jour le hachage avec le mot de passe fourni
  const data = hash.update(password, 'utf-8');

  // Génère le hachage au format hexadécimal
  const genHash = data.digest('hex');

  // Retourne le hachage généré
  return genHash;
}
