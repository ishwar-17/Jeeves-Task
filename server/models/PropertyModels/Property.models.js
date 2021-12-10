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
        { timestamps: true }
    );
  
    propertySchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    }); 
  
    const Property = mongoose.model("property", propertySchema);
    return Property;
};