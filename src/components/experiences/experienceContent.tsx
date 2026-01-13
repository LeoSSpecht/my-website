export default interface ItemData {
  imagePath?: string;
  itemHeader: string;
  itemTitle: string;
  itemSubtitle: string;
  itemContent: Array<string>;
  redirectLink?: string;
  /** If true, uses a custom 3D logo component instead of an image */
  customLogo?: "stripe";
}
