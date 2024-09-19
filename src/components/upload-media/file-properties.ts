export const MAX_FILE_SIZE_IN_MB = 20; // fileSize === 20MB
export const MAX_FILE_SIZE = 1024 * 1024 * MAX_FILE_SIZE_IN_MB; // fileSize === 20MB

const VIDEO_FORMATS = ['mp4', 'mov', 'webm'];
const IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const AUDIO_FORMATS = ['mp3', 'mpeg', 'wav'];

export const FILE_FORMATS = [...VIDEO_FORMATS, ...IMAGE_FORMATS, ...AUDIO_FORMATS];
