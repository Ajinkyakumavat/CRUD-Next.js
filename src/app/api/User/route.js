import { NextResponse } from 'next/server'
import Users from '../model/Users'
import mongoose from "mongoose"
import dbConnect from '../dbconfig/dbconfig'
dbConnect()

export const POST =async (req, res) => {
    const {id,title, description} =await req.json()
    const idCount = 0

    const newUser = new Users({
        id:idCount + 1,title,description
    })

    await newUser.save()
    return NextResponse.json(newUser)
}

export const GET = async(req, res) => {
    const response =await Users.find({})
    return NextResponse.json(response)
}

export const DELETE = async (req, res) => {
    const { _id } = req.body

    try {
        const response = await Users.findOneAndDelete(_id);
        if (!response) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export const PUT = async (req, res) => {
    if (req.method === 'PUT' || req.method === 'PATCH') {
      const { _id, title, description } = await req.json()
  
      try {
        const user = await Users.findById(_id);
  
        if (!user) {
          return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
  
        // Update user fields
        user.title = title;
        user.description = description;
  
        // Save the updated user
        const updatedUser = await user.save();
  
        return NextResponse.json(updatedUser);
      } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
  };
  
