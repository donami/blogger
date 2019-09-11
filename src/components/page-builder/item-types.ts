enum ItemTypes {
  WebComponent = 'WebComponent',
  Area = 'Area',
}

export type DraggableItem = {
  componentType: string;
  type: ItemTypes;
};

export default ItemTypes;
