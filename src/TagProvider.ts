import { Property } from "./BoligSidenService";
import { EstimatedProperty } from "./PropertyEstimator";


export type EstimatedTaggedProperty = EstimatedProperty & {
    tag:TagId[]
  };

const LOCAL_STORAGE_ID = "tags"

export interface PropertyTags {
    propertyId: string;
    tags: TagId[]
}
export enum TagId {
    BAD = "BAD",
    GOOD = "GOOD",
    VISITED = "SEEN",
}

export function getPropertyTags(propertyId:string):PropertyTags {
    const tagsJson = localStorage.getItem(LOCAL_STORAGE_ID);
    if(tagsJson) {
        const propertyTags = JSON.parse(tagsJson) as PropertyTags[];
        const propertyTag = propertyTags.find(tag => tag.propertyId === propertyId)
        if(propertyTag) {
            return propertyTag;
        }
    }
    return {propertyId, tags: []};
}

export function getAllPropertyTags():PropertyTags[] {
    const tagsJson = localStorage.getItem(LOCAL_STORAGE_ID);
    if(tagsJson) {
        const tags = JSON.parse(tagsJson) as PropertyTags[];
        return tags;
    }
    return []
}

export function addTag(propertyId:string, tagId: TagId) {
    const allPropertyTags = getAllPropertyTags();
    let tag = allPropertyTags.find(propertyTags => propertyTags.propertyId === propertyId);
    if(!tag) {
        tag = {propertyId, tags:[]}
        allPropertyTags.push(tag)
    }
    tag.tags.push(tagId);
    localStorage.setItem(LOCAL_STORAGE_ID,JSON.stringify(allPropertyTags));
}

export function deleteTag(propertyId:string, tagId:TagId) {
    var propertyTags = getAllPropertyTags();
    const propertyTag = propertyTags.find(tag => tag.propertyId === propertyId);
    if(propertyTag) {
        propertyTag.tags = propertyTag.tags.filter(tag => tag !== tagId)
    }
    localStorage.setItem(LOCAL_STORAGE_ID,JSON.stringify(propertyTags));
}


export function addTags(properties:EstimatedProperty[]):EstimatedTaggedProperty[] {
    return properties.map(property => {
        return {...property, tag:getPropertyTags(property.id).tags}
    })
}
