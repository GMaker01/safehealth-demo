module.exports = function(schema, options) {
    schema.statics.insertManyByDate = function(items) {
        const hasCreatedAt = items.filter(i => i.created_at !== null).length;
        let newItems = items;
        if(hasCreatedAt === 0){
            const created_at = Date.now();
            newItems = items.map(i => ({...i, created_at}));
        }
        return this.insertMany(newItems);
    }
}
