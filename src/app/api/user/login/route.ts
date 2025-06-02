import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {username,password} = await req.json();
    // bcrypt compare
    //
    const token = jwt.sign();
    return NextResponse.json({token})
}