enum ItemTypes {
  WebComponent = 'WebComponent',
}

export type DraggableItem = {
  componentType: string;
  type: ItemTypes;
};

export default ItemTypes;
