import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimplSchema from 'simpl-schema';
import Shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if(Meteor.isServer) {
    Meteor.publish('links', function () {
       // this.userId
        return Links.find({ userId: this.userId});
    });
}

Meteor.methods({
    'links.insert'(url) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        }

        new SimplSchema({
        url: {
            type: String,
            label: 'Your Link',
            regEx: SimplSchema.RegEx.Url
        }
        }).validate({ url });
         

        Links.insert({
            _id: Shortid.generate(),
            url, 
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    'links.setVisibility'(_id, visible) {
        if (!this.userId) {
            throw new Meteor.Error('Not-Authorized');
        }

        new SimplSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type:Boolean
            }
        }).validate({ _id, visible });

        Links.update({
            _id, 
            userId: this.userId
        }, {
            $set: { visible }
        });
    },
    'links.trackVisit'(_id) {
        new SimplSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        
        Links.update({ _id }, { 
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
    }

});