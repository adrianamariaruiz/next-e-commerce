import Image from "next/image"

interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className'] 
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style'] 
  width: number
  height: number
}

const ProductImage = ({src, alt, width, height, className, style}: Props) => {

  const newSrc = ( src ) 
  ? src.startsWith('http')
    ? src
    : `/products/${src}`
  : '/imgs/placeholder.jpg'

  return (
    <Image 
      src={newSrc} 
      alt={alt} 
      width={width} 
      height={height} 
      className={className} 
      style={style}
    />
  )
}

export default ProductImage