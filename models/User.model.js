const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [3, "Your username must have at least three characters"],
      trim: true,
      required: [true, "Username is required"],
      unique: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    paymentDetails: {
      card: {
        type: Number,
        minlength: [16, "Invalid card number"],
        maxlength: [16, "Invalid card number"]
      },
      country: {
        type: String,
      },
      postalCode: {
        type: Number,
      }
    }
  },
  {
    timestamps: true,
  }
)

const User = model("User", userSchema)

module.exports = User