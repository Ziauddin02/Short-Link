import { Meteor } from 'meteor/meteor';
import SimplSchema from 'simpl-schema';

SimplSchema.defineValidationErrorTransform((e) => {
    return new Meteor.Error(400, e.message)
});