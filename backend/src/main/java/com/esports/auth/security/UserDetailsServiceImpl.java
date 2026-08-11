package com.esports.auth.security;

import com.esports.auth.entity.User;
import com.esports.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of Spring Security's {@link UserDetailsService}.
 *
 * Loads a user by email (used as the "username" in Spring Security context),
 * and maps the application {@link com.esports.auth.entity.Role} to a
 * Spring Security {@link SimpleGrantedAuthority} with the "ROLE_" prefix.
 *
 * Spring Security's {@code hasRole("USER")} checks strip the "ROLE_" prefix,
 * so "ROLE_USER" maps to hasRole("USER") and "ROLE_ADMIN" maps to hasRole("ADMIN").
 */
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + email));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPasswordHash())
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())))
                .build();
    }
}
