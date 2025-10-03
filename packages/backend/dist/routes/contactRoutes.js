"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_controller_1 = require("../controllers/contacts.controller");
const validation_middleware_1 = require("../middleware/validation.middleware");
const create_contact_dto_1 = require("../dtos/contacts/request/create-contact.dto");
const update_contact_dto_1 = require("../dtos/contacts/request/update-contact.dto");
const router = express_1.default.Router();
router.get('/', contacts_controller_1.ContactsController.getAllContacts);
router.get('/:id', contacts_controller_1.ContactsController.getContactById);
router.post('/', (0, validation_middleware_1.validateDto)(create_contact_dto_1.CreateContactDto), contacts_controller_1.ContactsController.createContact);
router.put('/:id', (0, validation_middleware_1.validateDto)(update_contact_dto_1.UpdateContactDto), contacts_controller_1.ContactsController.updateContact);
router.delete('/:id', contacts_controller_1.ContactsController.deleteContact);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map