import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema (
    {
        videoFile: {  // mongoDb allows to store small videos and images as media file but it is not a good practice as it increases the load on database
            type: String, //cloudniary url
            required: true,
        },

        thumbnail: {
            type: String,  //cloudniary url
            required: true,
        },

        title: {
            type: String, 
            required: true,
        },

        description: {
            type: String, 
            required: true,
        },

        duration: { 
            type: Number, //cloudniary url. As soon as a file is uploaded to cloduniary the information of the file is sent back
            required: true,
        },

        views: { 
            type: Number,
            default: 0,
        },

        isPublished: {
            type:Boolean,
            default: true,
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

    }, 
    
    {
        timestamps: true
    },
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)