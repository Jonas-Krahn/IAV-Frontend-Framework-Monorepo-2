/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {FormEvent, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {APPLICATION_LOGO_PLACEHOLDER, BLUE3, PADDING_GAB, WHITE} from "@iav-ff-test-2/frontend-framework-shared/constants";
import {useTranslator} from "../../internationalization/translators";
import loginBackgroundLightMode from "../../../assets/png/login_background_lightMode.png";
import loginBackgroundDarkMode from "../../../assets/png/login_background_darkMode.png";
import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import {LanguageContext} from "../../../contexts/language";
import {Tooltip} from "primereact/tooltip";
import CompanyLogo from "../../../assets/svg/companyLogo";
import TextField from "../../helper/textfield/TextField";
import { AuthenticationViewProps } from "@iav-ff-test-2/frontend-framework-shared/authenticationViewProps";
import { generateHashOfLength } from "@iav-ff-test-2/frontend-framework-shared/hash";
import { parseLanguageResourcesIntoDropdownFormat } from "@iav-ff-test-2/frontend-framework-shared/parseLanguageResourcesIntoDropdownFormat";
import { LoginButtonWithSpinner } from "@iav-ff-test-2/frontend-framework-shared/loginButtonWithSpinner";
import { AppLogoPlaceholder } from "@iav-ff-test-2/frontend-framework-shared/appLogoPlaceholder";
import { AuthState } from "@iav-ff-test-2/frontend-framework-shared/authenticationProvider";
import { ColorSettingsContext } from "@iav-ff-test-2/frontend-framework-shared/colorSettingsContext";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { ThunkDispatch, Action } from "@reduxjs/toolkit";
import { ModuleContext } from "@iav-ff-test-2/frontend-framework-shared/moduleContext";
import { MandatoryModuleNames } from "@iav-ff-test-2/frontend-framework-shared/mandatoryModuleNames";

type BasicAuthenticatorAuthDispatch = ThunkDispatch<AuthState, unknown, Action<string>>;
type BasicAuthenticatorStoreState = {[MandatoryModuleNames.Authentication]: AuthState}

export const BasicAuthenticationView = (props: AuthenticationViewProps) => {
  const moduleContext = useContext(ModuleContext);
  const authModule = moduleContext.modules.auth;

  const colorSettingsContext = useContext(ColorSettingsContext);

  const dispatch = useDispatch<BasicAuthenticatorAuthDispatch>();
  const useAuthSelector: TypedUseSelectorHook<BasicAuthenticatorStoreState> = useSelector;

  const isLoading = useAuthSelector(state => state[MandatoryModuleNames.Authentication].isLoading);

  const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const langContext = useContext(LanguageContext);

  const t = useTranslator();

  const headerBackgroundColor =
    colorSettingsContext.currentColors.authenticationView.headerBackgroundColor;
  const fullScreenBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .fullScreenBackgroundColor;
  const loginFormBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .loginFormBackgroundColor;
  const inputFieldBackgroundColor =
    colorSettingsContext.currentColors.authenticationView
      .inputFieldBackgroundColor;
  const inputFieldTextColor =
    colorSettingsContext.currentColors.authenticationView.inputFieldTextColor;
  const legalNoticeIconColor =
    colorSettingsContext.currentColors.authenticationView.legalNoticeIconColor;
  const companyTextColor =
    colorSettingsContext.currentColors.authenticationView.companyTextColor;
  const themeTogglerColor =
    colorSettingsContext.currentColors.authenticationView.themeTogglerColor;

  const {passwordErrorMessage} = props.authOptions?.errorMessages || {};

  // These two functions life on the class instance not on the prototype thanks to @babel/plugin-proposal-class-properties.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    setTriedToSubmit(true);
    event.preventDefault();
    dispatch(authModule.login({credentials: {email: email, password: password}}));
  };

  const companyLogoDefault = (props: AuthenticationViewProps) => (
    <div
      style={{
        display: props.headerOptions?.hideRight ? "none" : "flex",
        alignItems: "center",
        paddingRight: `${PADDING_GAB}px`,
      }}
    >
      <CompanyLogo fill={colorSettingsContext?.darkmode ? BLUE3 : WHITE} />
    </div>
  );

  const header = (props: AuthenticationViewProps) => (
    <div
      className="flex justify-content-between"
      style={{
        backgroundColor: headerBackgroundColor,
        color: "white",
        alignItems: "center",
        height: "56px",
      }}
    >
      <div
        id="left-element-authentication"
        className="flex align-items-center default-app-logo-text-style"
      >
        {props.headerOptions?.reactElementLeft ? (
          props.headerOptions?.reactElementLeft
        ) : (
          <AppLogoPlaceholder appLogoPlaceholder={APPLICATION_LOGO_PLACEHOLDER} />
        )}
      </div>

      <div
        id="right-element-authentication"
        className="flex justify-content-end align-items-center"
      >
        {props.headerOptions?.reactElementRight
          ? props.headerOptions?.reactElementRight
          : companyLogoDefault(props)}
      </div>
    </div>
  );

  const identifier = generateHashOfLength(4);
  const identifierLegal = "a" + identifier;
  const identifierWithDot = "." + identifierLegal;

  return (
    <div
      className="flex"
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: fullScreenBackgroundColor,
      }}
    >
      {colorSettingsContext?.colorOptions.authenticationView
        ?.fullScreenBackgroundColor ? (
        <></>
      ) : (
        <img
          style={{
            inset: "0px",
            position: "absolute",
            zIndex: "-100",
            height: "100vh",
            width: "100vw",
            objectFit: "cover",
          }}
          src={
            props.authOptions?.backgroundImage
              ? props.authOptions?.backgroundImage
              : colorSettingsContext?.darkmode
                ? loginBackgroundDarkMode
                : loginBackgroundLightMode
          }
        />
      )}

      <div
        className="flex flex-column shadow-6"
        style={{
          position: "relative",
          width: "620px",
          margin: "auto",
          backgroundColor: loginFormBackgroundColor,
        }}
      >
        <div>{header(props)}</div>
        <div
          className="flex flex-column justify-content-center align-items-center"
          style={{marginBottom: "30px"}}
        >
          <div
            style={{width: "100%", padding: "24px 24px 0px 0px"}}
            className="flex align-items-center justify-content-end"
          >
            {props.authOptions?.preventDarkmode === true ? (
              <React.Fragment />
            ) : (
              <>
                <i
                  onClick={() =>
                    colorSettingsContext?.setDarkmode(
                      !colorSettingsContext.darkmode,
                    )
                  }
                  style={{
                    color: themeTogglerColor,
                  }}
                  className={`switch-colormode-logos pi ${
                    colorSettingsContext.darkmode ? "pi-moon" : "pi-sun"
                  }`}
                />
              </>
            )}

            {!props.hideLanguageSelection && (
              <Dropdown
                id="change-language-dropdown"
                style={{
                  width: "160px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                placeholder={
                  langContext?.resources[langContext.activeLang].translation
                    .option_name
                }
                onChange={function (event: DropdownChangeEvent) {
                  langContext?.selectLanguage(event.value.key);
                }}
                options={parseLanguageResourcesIntoDropdownFormat(
                  langContext?.resources,
                )}
                optionLabel="label"
              />
            )}
          </div>

          <form
            style={{
              width: "100%",
              height: "100%",
            }}
            onSubmit={submit}
          >
            <div
              style={{margin: "40px 24px 0px 24px"}}
              className={"flex flex-column"}
            >
              <TextField
                style={{
                  marginBottom: "30px",
                  backgroundColor: inputFieldBackgroundColor,
                  color: inputFieldTextColor,
                }}
                label={t("Email_address")}
                id="email"
                name="email"
                required={true}
                autoFocus={true}
                value={email.valueOf()}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                label={t("Password")}
                id="password"
                name="password"
                type="password"
                required={true}
                error={
                  triedToSubmit &&
                  !isLoading
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                helperText={passwordErrorMessage || t("wrong_password")}
              />
              <div>
                <LoginButtonWithSpinner isLoading={isLoading} />
              </div>
            </div>
          </form>
        </div>

        {!props.hideLegalDocuments && (
          <Link
            style={{
              position: "absolute",
              bottom: "12px",
              left: `${PADDING_GAB}px`,
              textDecoration: "none",
            }}
            to="/documents"
            target="_blank"
          >
            <span
              className={"pi pi-info-circle " + identifierLegal}
              style={{
                fontSize: "medium",
                fontWeight: "bold",
                color: legalNoticeIconColor,
              }}
            />
          </Link>
        )}

        <Tooltip
          content={t(
            props.authOptions?.documentsLabelKey
              ? props.authOptions?.documentsLabelKey
              : "Imprint",
          )}
          target={identifierWithDot}
          id="hover-image"
        />
        <span
          style={{
            alignSelf: "center",
            padding: "24px",
            fontSize: "11px",
            color: companyTextColor,
          }}
        >
          &copy;{" "}
          {props.authOptions?.companyText
            ? props.authOptions?.companyText
            : "Company 2025"}
        </span>
      </div>
    </div>
  );
};
