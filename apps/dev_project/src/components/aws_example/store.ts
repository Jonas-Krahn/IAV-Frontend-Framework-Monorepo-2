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

import { StoreBuilder } from "@iav-ff-test-2/frontend-framework/store";
import { Amplify } from "aws-amplify";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
import { CookieStorage } from "aws-amplify/utils";
import { awsAuthenticationViewFactory } from "@iav-ff-test-2/frontend-framework-aws-authenticator/awsAuthenticationView";
import { AWSAuthenticator } from "@iav-ff-test-2/frontend-framework-aws-authenticator/awsAuthenticatorModule";
import { useModuleContext } from "@iav-ff-test-2/frontend-framework/moduleContext";

console.log("AHOI");

console.log(import.meta.env);

const cognitoPool = import.meta.env.VITE_COGNITO_POOL;
const cognitoAppId = import.meta.env.VITE_COGNITO_APP_ID;
const domain = import.meta.env.VITE_DOMAIN;

const configureAmplify: () => void = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: cognitoPool,
        userPoolClientId: cognitoAppId,
      },
    },
  });
  cognitoUserPoolsTokenProvider.setKeyValueStorage(
    new CookieStorage({
      domain: domain,
      path: "/",
      expires: 365,
      // @ts-ignore
      secure: domain !== "localhost",
      sameSite: "lax",
    })
  );
};

export const modules = {
  auth: new AWSAuthenticator({
    configureAmplify: configureAmplify,
    failOnNoLegalGroup: true,
    legalGroups: ["ADMIN", "SHOWCASE"],
  }),
};

export const store = new StoreBuilder(modules)
  /*.setFrameworkModuleProcessor("auth", (
    authModule: AWSAuthenticator,
    storeConfigBuilder: StoreConfigBuilder,
  ) => {
  
  })*/ .build();

export const AwsAuthenticationView = awsAuthenticationViewFactory(modules.auth);

// Use this to create a typed module context.
export const useTypedModuleContext = useModuleContext<typeof modules>;
