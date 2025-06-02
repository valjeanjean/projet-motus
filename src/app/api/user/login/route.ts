import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest){

    try{

        
        console.log("Requete postman");
        
        const {email, sentPassword} = await req.json();

        console.log("sentPassword = " + sentPassword);
        
        const [user]:any = await db.execute("SELECT * FROM Player WHERE email=?", [email]);
        
        console.log("[user] = " + user);
        
        if(user.length == 0){
            
            console.log("Aucun utilisateur ne correspond à cet email");
            return NextResponse.json({
                
                message: "Aucun utilisateur ne correspond à cet email",
            });
        }
        
        const hashedPassword = user[0].password;
        console.log("Password hash BDD : " + hashedPassword);

        const isPasswordValid = await bcrypt.compare(sentPassword, hashedPassword);
        console.log("isPasswordValid : " + isPasswordValid);
        
        if(!isPasswordValid){
            
            console.error("Le mot de passe ne correspond pas");
            return NextResponse.json({
                
                message: "Le mot de passe ne correspond pas",
            });
            
        }
        
        const token = jwt.sign({
            
            playerID: user[0].playerID,
            email: user[0].email,
            username: user[0].username,
        }, 
        JWT_SECRET,
        { expiresIn: "7d" }
        );
        
        console.log("Connexion réussie");
        return NextResponse.json({
            
            token: token,
            message: "Connexion réussie",
        });

    }catch(error){

        console.error("Erreur du serveur lors de la connexion", error);
        return NextResponse.json({

            message: "Erreur du serveur lors de la connexion",
        });
    }

}