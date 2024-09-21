"use client";
import { useRef, useState } from "react";
import { capitalize } from "../lib/functions";
import { useSettings } from "./provider";

function Footer({ onChange }) {
  const [open, setOpen] = useState(false);
  const { settings, playClick } = useSettings();
  const dialog = useRef(null);
  const handleToggleSettings = () => {
    !open ? dialog.current.show() : dialog.current.close();
    setOpen(!open);
    playClick(settings.sound_effects);
  };

  return (
    <footer>
      <div className='footer-btn-wrapper'>
        <button className='btn' onClick={handleToggleSettings}>
          Settings
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
    </footer>
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
