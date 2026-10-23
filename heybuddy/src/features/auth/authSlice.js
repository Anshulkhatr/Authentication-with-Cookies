import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";


const initialState = {
    user: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    isErrorMessage: "",
    authInitialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.isError = false;
            state.isErrorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = getUser(action.payload);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            })

            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.user = getUser(action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            })

            .addCase(initializeAuth.pending, (state) => {
                state.authInitialized = false;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.user = getUser(action.payload);
                state.authInitialized = true;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.user = null;
                state.authInitialized = true;
            })

            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.isErrorMessage = "";
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isErrorMessage = action.payload;
            });
    },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;


export const initializeAuth = createAsyncThunk("auth/initialize", async (_, thunkAPI) => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        // If access token expired, try refreshing it.
        if (error.response?.status === 401) {
            try {
                await authService.refresh();
                return await authService.getCurrentUser();
            } catch {
                return thunkAPI.rejectWithValue("Session expired");
            }
        }

        return thunkAPI.rejectWithValue("Unable to verify session");
    }
}
);



// Extract only user data, never store tokens in Redux.
const getUser = (response) => {
    const data = response?.user ?? response?.data?.user;

    if (data) return data;

    // Supports APIs that return the user object directly.
    if (response?._id || response?.id || response?.email) {
        const { token, accessToken, refreshToken, ...user } = response;
        return user;
    }

    return null;
};

// Register
export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
    try {
        return await authService.register(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Registration failed"
        );
    }
}
);

// Login
export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
    try {
        return await authService.login(formData);
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Login failed"
        );
    }
}
);

// Logout: call backend to clear the cookies.
export const logoutUser = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await authService.logout();
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || "Logout failed"
        );
    }
}
);

// const authSlice = createSlice({

//     name: "auth",

//     initialState: {
//         user: null || isUser,
//         isLoading: false,
//         isSuccess: false,
//         isError: false,
//         isErrorMessage: "",
//     },

//     reducers: {},

//     extraReducers: (builder) => {

//         builder
//             .addCase(registerUser.pending, (state, action) => {
//                 state.isLoading = true
//                 state.isSuccess = false
//                 state.isError = false
//             })
//             .addCase(registerUser.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//                 state.isError = false
//             })
//             .addCase(registerUser.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.isErrorMessage = action.payload
//             })
//             .addCase(loginUser.pending, (state, action) => {
//                 state.isLoading = true
//                 state.isSuccess = false
//                 state.isError = false
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = action.payload
//                 state.isError = false
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = false
//                 state.isError = true
//                 state.isErrorMessage = action.payload
//             })
//             .addCase(logoutUser.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isSuccess = true
//                 state.user = null
//                 state.isError = false
//                 state.isErrorMessage = ""
//             })
//     }

// })

// export default authSlice.reducer




// // Register User

// export const registerUser = createAsyncThunk("AUTH/REGISTER", async (formData, thunkAPI) => {

//     try {
//         return authService.register(formData)

//     } catch (error) {
//         let message = error.response.data.message
//         return thunkAPI.rejectWithValue(message)
//     }

// })

// // Login User

// export const loginUser = createAsyncThunk("AUTH/LOGIN", async (formData, thunkAPI) => {

//     try {
//         return authService.login(formData)

//     } catch (error) {
//         let message = error.response.data.message
//         return thunkAPI.rejectWithValue(message)
//     }

// })

// // Logout USer

// export const logoutUser = createAsyncThunk("AUTH/Logout", async () => {

//     localStorage.removeItem('user')

// })