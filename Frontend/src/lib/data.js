const commonsThumb = (fileName, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=${width}`;

export const homeHeroImage = commonsThumb("Toyota Land Cruiser Prado (54098221407).jpg", 1200);
