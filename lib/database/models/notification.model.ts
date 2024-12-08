import { Schema, model, models } from 'mongoose'
// FIXIT
export interface INotification extends Document { 
    _id: string;
    to: string;
    from: {
        _id: string,
        name: string,
        imageUrl: string
    };
    massage: string;
    createdAt: string;
}

const NotificationSchema = new Schema({
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    from: { 
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        imageUrl: { type: String, required: true }
    },
    massage: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
})
   
const Notification = models.Notification || model('Notification', NotificationSchema)
  
export default Notification
  