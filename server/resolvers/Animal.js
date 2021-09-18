const Animal = {
    category: (parent, args, { categories }) => {
        console.log(categories)
        return categories.find((category) => {
            return category.id === parent.category
        })
    }
}

module.exports = Animal