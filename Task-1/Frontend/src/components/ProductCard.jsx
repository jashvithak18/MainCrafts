function ProductCard({name,price,description}) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p className="price">${price}</p>
      {description && <p className="desc">{description}</p>}
    </div>
  )
}
export default ProductCard;