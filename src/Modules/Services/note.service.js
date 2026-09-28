import { StatusCodes } from "http-status-codes";
import { Notes } from "../../DB/Models/note.model.js"
import { fail_res } from "../../Utils/fail.res.js"
import { mongoose } from 'mongoose';
export const create_note = async (userID, { title, content }) => {
    try {
        const ref = new mongoose.Types.ObjectId(userID)
        await Notes.insertOne({ userID: ref, title, content })
    } catch (error) {
        fail_res({ msg: error.message, statuscode: StatusCodes.NOT_ACCEPTABLE })
    }
}

export const update_id = async (userID, noteID, data) => {
    const note_id = new mongoose.Types.ObjectId(noteID)
    const note = await Notes.findById(note_id)
    if (!note) {
        fail_res({ msg: "note not found" })
    }
    else if (userID != note.userID.toString()) {
        fail_res({ msg: "You are not the owner" })
    }
    else {
        const result = await Notes.findOneAndUpdate({ _id: note_id }, { $set: data }, { runValidators: true, returnDocument: "after" })
        return result
    }
}

export const replace = async (noteID, data) => {
    const note_id = new mongoose.Types.ObjectId(noteID)
    const note = await Notes.findById(note_id)
    if (!note) {
        fail_res({ msg: "note not found" })
    }

    else if (data.userID != note.userID.toString()) {
        fail_res({ msg: "You are not the owner" })
    }
    else {
        const user_id = new mongoose.Types.ObjectId(data.userID)
        const { title, content } = data
        const result = await Notes.findOneAndReplace({ _id: note_id }, { title, content, userID: user_id }, { runValidators: true, returnDocument: "after" })
        return result
    }
}

export const update_all_title = async (userID, data) => {
    const user = new mongoose.Types.ObjectId(userID)
    const notes = await Notes.find({ userID: user })
    if (notes.length == 0) {
        fail_res({ msg: "No notes found" })
    }
    else {
        await Notes.updateMany({ userID: user }, { $set: data }, { runValidators: true, returnDocument: "after" })
    }
}

export const delete_noteid = async (userID, noteID) => {
    const note_id = new mongoose.Types.ObjectId(noteID)
    const note = await Notes.findById(note_id)
    if (!note) {
        fail_res({ msg: "No note found" })
    }
    else if (userID != note.userID.toString()) {
        fail_res({ msg: "You are not the owner" })
    }
    else {
        const result = await Notes.findByIdAndDelete(note_id)
        return result
    }
}

export const get_sorted = async (page, limit) => {
    const notes = await Notes.aggregate([{
        $sort: { createdAt: -1 }
    }, {
        $skip: (page - 1) * limit,
    }, { $limit: limit }])
    return notes
}

export const get_id = async (userID, noteID) => {
    const note = await Notes.findById(noteID)
    if (!note) {
        fail_res({ msg: "Note not found" })
    }
    else if (userID != note.userID.toString()) {
        fail_res({ msg: "You are not the owner" })
    }
    else {
        return note
    }
}

export const get_content = async (content) => {
    const note = await Notes.find({ content })
    if (note.length==0) {
        fail_res({ msg: "No note found" })
    }
    else {
        return note
    }
}

export const get_lookup = async (userID) => {
    const ref = new mongoose.Types.ObjectId(userID)
    const notes = await Notes.aggregate(
        [
            {
                $match: {
                    userID: ref
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userID",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $project: {
                    title: 1,
                    userID: 1,
                    createdAt: 1,
                    'user.email': 1
                }
            }
        ]
    )
    return notes
}

export const get_aggregate = async (title) => {
    const notes = await Notes.aggregate([{
        $match: {
            title
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userID",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $project: {
            title: 1,
            userID: 1,
            createdAt: 1,
            'user.name': 1,
            'user.email': 1
        }
    }
    ])
    return notes
}

export const delete_usernotes = async (userID) => {
    const ref = new mongoose.Types.ObjectId(userID)
    const notes = await Notes.find({ userID: ref })
    if (notes.length==0) {
        fail_res({ msg: "No notes found" })
    }
    else {
        await Notes.deleteMany({ userID: ref })
    }
}