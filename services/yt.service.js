const ytdl = require('ytdl-core');

exports.extractYouTubeVideoInfo = async (url) => {
  if (!ytdl.validateURL(url)) {
    throw new Error('Invalid YouTube URL');
  }

  const info = await ytdl.getInfo(url);
  const formats = ytdl.filterFormats(info.formats, 'videoandaudio');

  return {
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails?.[info.videoDetails.thumbnails.length - 1]?.url || '',
    formats: formats.map((f) => ({
      quality: f.qualityLabel,
      type: f.container,
      size: f.contentLength,
      url: f.url,
    })),
  };
};
