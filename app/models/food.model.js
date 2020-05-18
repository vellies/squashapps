module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        cuisine: String,
        ingredients: String,
        lotNumber:{type: Number, unique: true},
        costOfProduction:Number,
        sellingCost:Number,
        status:Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Food = mongoose.model("food", schema);
    return Food;
  };