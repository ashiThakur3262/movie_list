export class ImageUtils {
  static getFullImageUrl = (posterPath: string) => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const imageSize = 'w400';
    const imageUrl = `${baseUrl}${imageSize}${posterPath}`;
    return imageUrl;
  };
}
