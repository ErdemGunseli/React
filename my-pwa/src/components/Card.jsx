export default function Card({ image, selected, onClick }) {
    return (
        <div className="card">
            {/* The class of the inner div will be 'selected' if the card is selected, null otherwise */}
            <div className={selected && 'selected'}>
                {/* This image is shown if the card is selected: */}
                <img alt="" className='card-face' src={image} />

                {/* This image is shown otherwise: */}
                <img alt="" className="card-back" src={'/assets/fireship.png'} onClick={onClick}/>
            
            </div>
        </div>
    );
};