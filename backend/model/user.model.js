import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "node:crypto";
import { setUser } from "../services/auth.js";
let userschema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    profileImageUrl: {
      type: String,
      default: "/images/profileImage.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
userschema.pre("save", function (next) {
  let user = this;
  if (!user.password) return;
  const salt = randomBytes(16).toString();
  const hasshed = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hasshed;
  next();
});

userschema.static("matchPassword", async function (email, password) {
    if (!email || !password) throw new Error('email and password is required')
    let user = await this.findOne({ email });
    if (!user) throw new Error("user not found");
    const hassedpassword = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
    if(hassedpassword !== user.password) throw new Error('password is ivalid')
    let token=setUser(user)
    return token;
});

let usermodel = model("usermodel", userschema);

export default usermodel;
