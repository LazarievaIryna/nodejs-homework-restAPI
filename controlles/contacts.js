const {Contact} = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  console.log(req)
  const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit});
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts: result,
      },
    })
}

const getContactById  = async (req, res) => {
    const { id } = req.params;
    
    const result = await Contact.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const addContact  = async (req, res) => {
  const {_id: owner} = req.user;
 
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.create({...req.body, owner});
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { contact: result },
    })
}

const updateContact  = async (req, res) => {
    const { id } = req.params
  const { name, email, phone } = req.body
    const { error } = req.body;
    if (error) {
      throw HttpError(400, `Missing required name field`)
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, { name, email, phone }, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

const updateFavorite = async (req, res) => {
    const { id } = req.params
    const { error } = req.body;
  if (error) {
      throw HttpError(400, 'missing field favorite"')
    }
    const result = await Contact.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

const removeContact  = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndRemove({ _id: id })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact: result },
      })
    } else {
      throw HttpError(404, `Not found contact id: ${id}`)
    }
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavorite: ctrlWrapper(updateFavorite),
    removeContact: ctrlWrapper(removeContact),
}