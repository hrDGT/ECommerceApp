export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
};

export type ProductsResponse = {
  products: Product[];
};

export type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
  onClick?: () => void;
}

export type ProductDetailsProps = {
  product: Product;
  onClose: () => void;
}
