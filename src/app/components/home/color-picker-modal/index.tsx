'use client';

import ColorPicker from 'react-pick-color';

import { Button, Dialog, DialogContent, DialogFooter } from 'components';

type ColorPickerModalProps = {
  color: string;
  handleChangeColor: (color: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

const ColorPickerModal = ({
  color,
  isOpen,
  onClose,
  handleChangeColor,
}: ColorPickerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="w-auto flex flex-col items-center justify-center p-8">
        <ColorPicker
          hideAlpha
          hideInputs
          color={color}
          onChange={(color) => {
            handleChangeColor(color.hex);
          }}
        />

        <DialogFooter className="w-full">
          <Button className="w-full" onClick={onClose}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ColorPickerModal };
