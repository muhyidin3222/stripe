import React, { useState } from 'react';

//general
import clsx from 'clsx';

//component
import ArchIntroLayout from 'components/layout/ArchIntroLayout'

//material
import { Button, TextField, FormControlLabel, Checkbox, Link, Grid, InputAdornment, IconButton, InputLabel,OutlinedInput, FormControl } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

//styles
import useStyles from 'assets/style/page/auth'

export default function SignUp () {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)

  return (
    <ArchIntroLayout title="Sign in">
      <form className={classes.form} noValidate>
        <Grid container spacing={2}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            size="small"
            name="email"
            className={classes.marginInputTop}
            autoComplete="email"
          />
          <TextField
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            size="small"
            id="name"
            label="Nama lengkap"
            className={classes.marginInputTop}
            autoFocus
          />
          <FormControl
            className={classes.marginInputTop}
            variant="outlined"
            fullWidth
            size="small"
            required
          >
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <OutlinedInput
              variant="outlined"
              required
              fullWidth
              size="small"
              name="password"
              label="Kata Sandi"
              id="password"
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            size="small"
            label="Dapatkan email dari Stripe tentang pembaruan produk, berita industri, dan kejadian. Jika berubah pikiran, Anda dapat berhenti berlangganan kapan saja."
            className={classes.sizeText}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </ArchIntroLayout>
  );
}