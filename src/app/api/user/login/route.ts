import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { email, sentPassword } = await req.json();

    const [user]: any = await db.execute("SELECT * FROM Player WHERE email=?", [email]);

    if (user.length === 0) {
      return NextResponse.json({ message: "Aucun utilisateur ne correspond à cet email" }, { status: 401 });
    }

    const hashedPassword = user[0].password;
    const isPasswordValid = await bcrypt.compare(sentPassword, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Le mot de passe ne correspond pas" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        playerID: user[0].playerID,
        email: user[0].email,
        username: user[0].username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    console.log("Connexion réusie, set du token dans les cookies");
    
    const response = NextResponse.json({ success: true, message: "Connexion réussie", token: token });
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      sameSite: "strict",
    });
    

    return response;

  }catch (error) {
    return NextResponse.json({ message: "Erreur du serveur lors de la connexion" }, { status: 500 });
  }
}
