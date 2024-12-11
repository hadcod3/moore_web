import { Schema, model, models } from 'mongoose'

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
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    massage: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
})
   
const Notification = models.Notification || model('Notification', NotificationSchema)
  
export default Notification
  