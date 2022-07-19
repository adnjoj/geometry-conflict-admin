export interface TreeNode {
  id: string;
  parentId: string;
  childrenIds: string[];

  addChild: (child: TreeNode, insertionIndex?: number) => void;
  setParent: (parent: TreeNode) => void;
}
