import { Router } from "express";
import * as note_service from '../Services/note.service.js'
import { success_res } from "../../Utils/success.res.js";
import { StatusCodes } from "http-status-codes";
export const router = Router()
export const routes = {
    base: "/notes",
    create_note: "/",
    update_id: "/:noteid",
    replace: "/replace/:noteid",
    update_all_titles: "/all",
    delete_noteid: "/:noteid",
    get_sorted: "/paginate-sort",
    get_id: "/:noteid",
    get_content: "/note-by-content",
    get_lookup: "/note-with-user",
    get_aggregate: "/aggregate",
    delete_usernotes: "/"
}

router.post(routes.create_note, async (req, res) => {
    const { userID } = req.query
    await note_service.create_note(userID, req.body)
    success_res({ res, statuscode: StatusCodes.CREATED, msg: "Note created" })
})

router.patch(routes.update_all_titles, async (req, res) => {
    const { userID } = req.query
    await note_service.update_all_title(userID, req.body)
    success_res({ res, msg: "All notes updated" })

})
router.patch(routes.update_id, async (req, res) => {
    const { userID } = req.query
    const noteID = req.params.noteid
    const data = await note_service.update_id(userID, noteID, req.body)
    success_res({ res, data })
})

router.put(routes.replace, async (req, res) => {
    const noteID = req.params.noteid
    const data = await note_service.replace(noteID, req.body)
    success_res({ res, data })
})



router.delete(routes.delete_usernotes, async (req, res) => {
    const { userID } = req.query
    await note_service.delete_usernotes(userID)
    success_res({ res, msg: "Deleted" })
})


router.delete(routes.delete_noteid, async (req, res) => {
    const { userID } = req.query
    const noteID = req.params.noteid
    const data = await note_service.delete_noteid(userID, noteID)
    success_res({ res, msg: "Deleted", data })
})

router.get(routes.get_sorted, async (req, res) => {
    const { page, limit } = req.query
    const data = await note_service.get_sorted(+page, +limit)
    success_res({ res, data })
})


router.get(routes.get_content, async (req, res) => {
    const { content } = req.query
    const data = await note_service.get_content(content)
    success_res({ res, data })
})

router.get(routes.get_lookup, async (req, res) => {
    const { userID } = req.query
    const data = await note_service.get_lookup(userID)
    success_res({ res, data })
})

router.get(routes.get_aggregate, async (req, res) => {
    const { title } = req.query
    const data = await note_service.get_aggregate(title)
    success_res({ res, data })
})

router.get(routes.get_id, async (req, res) => {
    const { userID } = req.query
    const noteID = req.params.noteid
    const note = await note_service.get_id(userID, noteID)
    success_res({ res, data: note })
})
