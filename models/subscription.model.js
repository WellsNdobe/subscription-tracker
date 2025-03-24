import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name must be less than 50 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "ZAR"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
      enum: ["card", "paypal"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["active", "inactive", "expired"],
    },
    startDate: {
      //must be a past date or current
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (v) {
          return v <= new Date();
        },
        message: (props) =>
          `${props.value} must be a past date or current date`,
      },
    },
    renewalDate: {
      type: Date,
      required: [true, "Renewal date is required"],
      validate: {
        validator: function (v) {
          return v >= this.startDate;
        },
        message: (props) =>
          `${props.value} must be a future date or current date`,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }

  if (this.renewalDate < this.startDate) {
    this.status = "expired";
  }

  next();
});

const subscription = mongoose.model("Subscription", subscriptionSchema);
export default subscription;
