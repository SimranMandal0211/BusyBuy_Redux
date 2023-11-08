import styles from '../../styles/home.module.css';

export default function FilterBar(props){
    const {price, setPrice,setCategory} = props;

    return(
        <div className={styles.filterBarContainer}>
            <h2>Filter</h2>

            <div className={styles.p5}>
                <span>Price</span>{` <= ${price}`}
                <br />
                <input type='range'
                    max='5000' min='100'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className={styles.p5}>
                <h2>Category</h2>
                <div className={styles.p5}>
                    {/* Men */}
                    <input type='radio'
                        id='men'
                        value='men'
                        name='category'
                        onChange={() => setCategory('men')}
                    />
                    <label htmlFor='men'>Men</label>
                    <br />

                    {/* women */}
                    <input type='radio'
                        id='women'
                        value='women'
                        name='category'
                        onChange={() => setCategory('women')}
                    />
                    <label htmlFor='women'>Women</label>
                    <br />

                    {/* electronic */}
                    <input type='radio'
                        id='electric'
                        value='electric'
                        name='category'
                        onChange={() => setCategory('electric')}
                    />
                    <label htmlFor='electric'>Electronic</label>
                    <br />

                    {/* jewellery */}
                    <input type='radio'
                        id='jewellery'
                        value='jewellery'
                        name='category'
                        onChange={() => setCategory('jewellery')}
                    />
                    <label htmlFor='jewellery'>Jewellery</label>
                    <br />
                    
                    {/* none */}
                    <input type='radio'
                        id='none'
                        value='none'
                        name='category'
                        onChange={() => setCategory('none')}
                    />
                    <label htmlFor='none'>None</label>
                </div>
            </div>
        </div>
    )
}