"use client";
import { useRef, useState } from "react";
import { capitalize } from "../lib/functions";
import { useSettings } from "./provider";

function Footer({ onChange }) {
  const [open, setOpen] = useState(false);
  const [openHowTo, setOpenHowTo] = useState(false);
  const { settings, playClick } = useSettings();
  const dialog = useRef(null);
  const howToDialog = useRef(null);
  const handleToggleSettings = () => {
    if (openHowTo) {
      setOpenHowTo(false);
      howToDialog.current.close();
    }
    !open ? dialog.current.show() : dialog.current.close();
    setOpen(!open);
    playClick(settings.sound_effects);
  };

  const handleToggleHowTo = () => {
    if (open) {
      setOpen(false);
      dialog.current.close();
    }
    !openHowTo ? howToDialog.current.show() : howToDialog.current.close();
    setOpenHowTo(!openHowTo);
    playClick(settings.sound_effects);
  };

  return (
    <footer>
      <div className='footer-btn-wrapper'>
        <button className='btn' onClick={handleToggleSettings}>
          Settings
        </button>
        <button className='btn' onClick={handleToggleHowTo}>
          ?
        </button>
      </div>
      <Settings
        settings={settings}
        dialog={dialog}
        setOpen={() => {
          setOpen(false);
          playClick(settings.sound_effects);
        }}
        onCheck={onChange}
      />
      <HowTo
        howToDialog={howToDialog}
        setOpen={() => {
          setOpenHowTo(false);
          playClick(settings.sound_effects);
        }}
      />
    </footer>
  );
}

function HowTo({ howToDialog, setOpen }) {
  return (
    <dialog ref={howToDialog}>
      <div className='how-to'>
        <h3>How to:</h3>
        <p>
          Each time you click a card get a point, then they are shuffled. Your
          goal is to click each card once
        </p>
        <div className='dialog-btn-wrapper'>
          <button
            className='btn'
            onClick={() => {
              howToDialog.current.close();
              setOpen();
            }}
          >
            X
          </button>
        </div>
      </div>
    </dialog>
  );
}

function Settings({ settings, dialog, setOpen, onCheck }) {
  const fields = settings && Object.keys(settings);

  return (
    <dialog ref={dialog}>
      <div className='settings-wrapper'>
        <h3>Settings</h3>
        <div className='settings'>
          {fields &&
            fields.map((field, index) => {
              return (
                <label key={index} htmlFor={field}>
                  {capitalize(field) + ":"}
                  {
                    <input
                      type='checkbox'
                      name={field}
                      id={field}
                      checked={settings[field]}
                      onChange={(event) => {
                        onCheck(event);
                      }}
                    />
                  }
                </label>
              );
            })}
        </div>
        <div className='dialog-btn-wrapper'>
          <button
            className='btn'
            onClick={() => {
              dialog.current.close();
              setOpen();
            }}
          >
            X
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default Footer;
