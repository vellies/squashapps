module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        lotNumber:{type: Number, unique: true},
        availableQuantity:Number,
        thresholdQuantity:Number,
        price:Number,
        vendorName:String,
        vendorEmail:String,
        status:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Ingredient = mongoose.model("ingredients", schema);
    return Ingredient;
  };