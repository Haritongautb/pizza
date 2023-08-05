const Categories = ({ category, setCategory }) => {
    const categories = [
        { "id": "all", "title": "все" },
        { "id": "meat", "title": "мясные" },
        { "id": "vegan", "title": "вегетарианский" },
        { "id": "grill", "title": "гриль" },
        { "id": "spicy", "title": "острые" },
        { "id": "closed", "title": "закрытые" }
    ];

    const renderElements = (arr) => arr.map((item, index) => <li
        key={item.id}
        onClick={() => setCategory(index)}
        className={index === category ? "active" : ""}>
        {item.title}
    </li>)

    const elements = renderElements(categories);
    return (
        <div className="categories">
            <ul>
                {
                    elements
                }
            </ul>
        </div>
    )
}

export default Categories;