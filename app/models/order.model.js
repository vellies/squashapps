module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        orderNum:{type: Number, unique: true},
        status:Boolean,
        orderDate:{ type : Date, default: Date.now },
        dateOfdelivery:{ type : Date, default: Date.now },
        modeOfTransport:String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return 1;
    });
  
    const Order = mongoose.model("order", schema);
    return Order;
  };