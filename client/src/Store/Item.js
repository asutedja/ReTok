const Item = (props) => (

	<div>
		<div>{props.item} onClick={(e) =>{e.preventDefault(); props.buyEmoji()}}</div> 
	</div>
	);

export default Item