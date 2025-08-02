import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import pluginRouter from "@tanstack/eslint-plugin-router";

export default defineConfig([...pluginRouter.configs["flat/recommended"]]);
