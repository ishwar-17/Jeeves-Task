const { stringify } = require("querystring");

module.exports = mongoose => {
    var propertySchema = mongoose.Schema(
        {
            propertyName:String,
            description: String,
            images: [],
            address: String,
            locality: String,
            price:[],
            carpetArea: String
        },
    );
  
    propertySchema.set('timestamps', true)
  
    const Property = mongoose.model("property", propertySchema);
    return Property;
};